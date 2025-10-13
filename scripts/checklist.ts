#!/usr/bin/env tsx

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

interface ChecklistItem {
  id: string
  content: string
  owner?: string
  status: 'TODO' | 'IN-PROGRESS' | 'DONE'
  due?: string
  links?: string[]
}

interface ChecklistSection {
  name: string
  items: ChecklistItem[]
}

interface ChecklistData {
  sections: ChecklistSection[]
}

class ChecklistManager {
  private filePath: string
  private content: string

  constructor() {
    this.filePath = join(process.cwd(), 'docs', 'BUILD_CHECKLIST.md')
    this.loadFile()
  }

  private loadFile() {
    try {
      this.content = readFileSync(this.filePath, 'utf-8')
    } catch (error) {
      console.error('❌ Error loading checklist file:', error)
      process.exit(1)
    }
  }

  private saveFile() {
    try {
      writeFileSync(this.filePath, this.content, 'utf-8')
      console.log('✅ Checklist updated successfully')
    } catch (error) {
      console.error('❌ Error saving checklist file:', error)
      process.exit(1)
    }
  }

  private parseChecklist(): ChecklistData {
    const sections: ChecklistSection[] = []
    const lines = this.content.split('\n')
    
    let currentSection: ChecklistSection | null = null
    let currentItem: ChecklistItem | null = null

    for (const line of lines) {
      // Section headers (## P1, ## P2, etc.)
      if (line.match(/^## (P[123]|Acceptance Tests|Blocking Issues|Decisions Log|Release Checklist|Change Log)/)) {
        if (currentSection) {
          sections.push(currentSection)
        }
        currentSection = {
          name: line.replace(/^## /, ''),
          items: []
        }
        currentItem = null
        continue
      }

      // Subsection headers (### Auth, ### Shell, etc.)
      if (line.match(/^### /)) {
        if (currentSection && currentItem) {
          currentSection.items.push(currentItem)
          currentItem = null
        }
        continue
      }

      // Checklist items (- [ ] or - [x])
      const itemMatch = line.match(/^- \[([ x])\] (.+) — Owner: (.+) — Status: (.+) — Due: (.+) — Links: (.+)/)
      if (itemMatch) {
        if (currentSection && currentItem) {
          currentSection.items.push(currentItem)
        }
        
        const [, checked, content, owner, status, due, links] = itemMatch
        currentItem = {
          id: this.generateItemId(content),
          content: content.trim(),
          owner: owner.trim() || undefined,
          status: (checked === 'x' ? 'DONE' : status.trim()) as 'TODO' | 'IN-PROGRESS' | 'DONE',
          due: due.trim() || undefined,
          links: links.trim() ? links.split(',').map(l => l.trim()) : []
        }
        continue
      }

      // Continue building current item if it spans multiple lines
      if (currentItem && line.trim() && !line.match(/^[-#]/)) {
        currentItem.content += ' ' + line.trim()
      }
    }

    // Add the last item and section
    if (currentSection && currentItem) {
      currentSection.items.push(currentItem)
    }
    if (currentSection) {
      sections.push(currentSection)
    }

    return { sections }
  }

  private generateItemId(content: string): string {
    return content
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50)
  }

  private findItem(sections: ChecklistSection[], searchContent: string): { section: ChecklistSection; item: ChecklistItem; index: number } | null {
    for (const section of sections) {
      for (let i = 0; i < section.items.length; i++) {
        const item = section.items[i]
        if (item.content.toLowerCase().includes(searchContent.toLowerCase())) {
          return { section, item, index: i }
        }
      }
    }
    return null
  }

  private updateContent(sections: ChecklistSection[]) {
    let newContent = this.content

    // Update each section
    for (const section of sections) {
      for (const item of section.items) {
        const checkbox = item.status === 'DONE' ? 'x' : ' '
        const owner = item.owner || '@dev'
        const due = item.due || 'TBD'
        const links = item.links?.length ? item.links.join(', ') : ''
        
        const newLine = `- [${checkbox}] ${item.content} — Owner: ${owner} — Status: ${item.status} — Due: ${due} — Links: ${links}`
        
        // Find and replace the line
        const regex = new RegExp(`- \\[[ x]\\] ${item.content.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} — Owner: .+ — Status: .+ — Due: .+ — Links: .+`, 'g')
        newContent = newContent.replace(regex, newLine)
      }
    }

    this.content = newContent
  }

  add(sectionName: string, content: string, options: { owner?: string; due?: string } = {}) {
    const sections = this.parseChecklist()
    const section = sections.find(s => s.name === sectionName)
    
    if (!section) {
      console.error(`❌ Section "${sectionName}" not found`)
      process.exit(1)
    }

    const newItem: ChecklistItem = {
      id: this.generateItemId(content),
      content,
      owner: options.owner || '@dev',
      status: 'TODO',
      due: options.due || 'TBD',
      links: []
    }

    section.items.push(newItem)
    this.updateContent(sections)
    this.saveFile()
    
    console.log(`✅ Added item to ${sectionName}: "${content}"`)
  }

  done(searchContent: string) {
    const sections = this.parseChecklist()
    const result = this.findItem(sections, searchContent)
    
    if (!result) {
      console.error(`❌ Item not found: "${searchContent}"`)
      process.exit(1)
    }

    result.item.status = 'DONE'
    this.updateContent(sections)
    this.saveFile()
    
    console.log(`✅ Marked as done: "${result.item.content}"`)
  }

  link(searchContent: string, prUrl: string) {
    const sections = this.parseChecklist()
    const result = this.findItem(sections, searchContent)
    
    if (!result) {
      console.error(`❌ Item not found: "${searchContent}"`)
      process.exit(1)
    }

    if (!result.item.links) {
      result.item.links = []
    }
    
    if (!result.item.links.includes(prUrl)) {
      result.item.links.push(prUrl)
    }

    this.updateContent(sections)
    this.saveFile()
    
    console.log(`✅ Added link to "${result.item.content}": ${prUrl}`)
  }

  status(searchContent: string, newStatus: 'TODO' | 'IN-PROGRESS' | 'DONE') {
    const sections = this.parseChecklist()
    const result = this.findItem(sections, searchContent)
    
    if (!result) {
      console.error(`❌ Item not found: "${searchContent}"`)
      process.exit(1)
    }

    result.item.status = newStatus
    this.updateContent(sections)
    this.saveFile()
    
    console.log(`✅ Updated status for "${result.item.content}": ${newStatus}`)
  }

  list(sectionName?: string) {
    const sections = this.parseChecklist()
    
    if (sectionName) {
      const section = sections.find(s => s.name === sectionName)
      if (!section) {
        console.error(`❌ Section "${sectionName}" not found`)
        process.exit(1)
      }
      
      console.log(`\n📋 ${section.name}`)
      console.log('='.repeat(section.name.length + 4))
      
      for (const item of section.items) {
        const status = item.status === 'DONE' ? '✅' : item.status === 'IN-PROGRESS' ? '🔄' : '⏳'
        console.log(`${status} ${item.content}`)
        if (item.owner) console.log(`   Owner: ${item.owner}`)
        if (item.due) console.log(`   Due: ${item.due}`)
        if (item.links?.length) console.log(`   Links: ${item.links.join(', ')}`)
        console.log()
      }
    } else {
      console.log('\n📋 All Sections')
      console.log('===============')
      
      for (const section of sections) {
        const doneCount = section.items.filter(item => item.status === 'DONE').length
        const totalCount = section.items.length
        const progress = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0
        
        console.log(`\n${section.name}: ${doneCount}/${totalCount} (${progress}%)`)
        console.log('-'.repeat(section.name.length + 20))
      }
    }
  }
}

// CLI Interface
function main() {
  const args = process.argv.slice(2)
  const command = args[0]

  if (!command) {
    console.log(`
📋 Arqam Build Checklist Manager

Usage:
  checklist add <section> "<item>" --owner @handle --due YYYY-MM-DD
  checklist done "<item>"
  checklist link "<item>" --pr <url>
  checklist status "<item>" <TODO|IN-PROGRESS|DONE>
  checklist list [section]

Examples:
  checklist add "P1" "Auth pages implementation" --owner @john --due 2024-01-15
  checklist done "Auth pages implementation"
  checklist link "Auth pages implementation" --pr https://github.com/org/repo/pull/123
  checklist status "Auth pages implementation" IN-PROGRESS
  checklist list "P1"
  checklist list
`)
    process.exit(0)
  }

  const manager = new ChecklistManager()

  try {
    switch (command) {
      case 'add': {
        const section = args[1]
        const item = args[2]
        const ownerIndex = args.indexOf('--owner')
        const dueIndex = args.indexOf('--due')
        
        if (!section || !item) {
          console.error('❌ Usage: checklist add <section> "<item>" [--owner @handle] [--due YYYY-MM-DD]')
          process.exit(1)
        }

        const options: { owner?: string; due?: string } = {}
        if (ownerIndex !== -1 && args[ownerIndex + 1]) {
          options.owner = args[ownerIndex + 1]
        }
        if (dueIndex !== -1 && args[dueIndex + 1]) {
          options.due = args[dueIndex + 1]
        }

        manager.add(section, item, options)
        break
      }

      case 'done': {
        const item = args[1]
        if (!item) {
          console.error('❌ Usage: checklist done "<item>"')
          process.exit(1)
        }
        manager.done(item)
        break
      }

      case 'link': {
        const item = args[1]
        const prIndex = args.indexOf('--pr')
        const prUrl = prIndex !== -1 ? args[prIndex + 1] : null
        
        if (!item || !prUrl) {
          console.error('❌ Usage: checklist link "<item>" --pr <url>')
          process.exit(1)
        }
        manager.link(item, prUrl)
        break
      }

      case 'status': {
        const item = args[1]
        const status = args[2] as 'TODO' | 'IN-PROGRESS' | 'DONE'
        
        if (!item || !status || !['TODO', 'IN-PROGRESS', 'DONE'].includes(status)) {
          console.error('❌ Usage: checklist status "<item>" <TODO|IN-PROGRESS|DONE>')
          process.exit(1)
        }
        manager.status(item, status)
        break
      }

      case 'list': {
        const section = args[1]
        manager.list(section)
        break
      }

      default:
        console.error(`❌ Unknown command: ${command}`)
        process.exit(1)
    }
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export { ChecklistManager }

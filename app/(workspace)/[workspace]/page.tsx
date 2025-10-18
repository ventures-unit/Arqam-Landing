import { redirect } from 'next/navigation'

type WorkspaceParams = {
  params: {
    workspace: 'intelligence' | 'analyze' | 'build' | 'explore'
  }
}

export default function WorkspacePage({ params }: WorkspaceParams) {
  const { workspace } = params

  // Redirect to default module based on workspace
  if (workspace === 'intelligence') {
    redirect(`/${workspace}/economy`)
  }

  // For other workspaces, redirect to dashboards
  redirect(`/${workspace}/dashboards`)
}

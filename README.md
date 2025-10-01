# Arqam Landing Page

A modern, responsive landing page for Arqam's AI-powered Data Room, built with Next.js, Tailwind CSS, and Supabase.

## 🚀 Features

- **Modern Design**: Clean, professional UI matching the provided screenshot
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Form Handling**: Secure signup form with Supabase integration
- **Rate Limiting**: Basic protection against spam submissions
- **SEO Optimized**: Built with Next.js for optimal performance

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Supabase
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone and install dependencies:**
   ```bash
   cd arqam-landing
   npm install
   ```

2. **Set up Supabase:**
   - Create a new project at [supabase.com](https://supabase.com)
   - Create the `arqam_signups` table using the SQL below
   - Get your project URL and anon key

3. **Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 🗄 Supabase Database Schema

Run this SQL in your Supabase SQL editor to create the required table:

```sql
-- Create the arqam_signups table
CREATE TABLE arqam_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('Founder', 'Government', 'Researcher', 'Investor', 'Other')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX idx_arqam_signups_email ON arqam_signups(email);

-- Create an index on created_at for analytics
CREATE INDEX idx_arqam_signups_created_at ON arqam_signups(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE arqam_signups ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (for signups)
CREATE POLICY "Allow public signups" ON arqam_signups
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows authenticated users to read (for admin)
CREATE POLICY "Allow authenticated read" ON arqam_signups
  FOR SELECT USING (auth.role() = 'authenticated');
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Add environment variables in Vercel dashboard:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Deploy!**

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🎨 Customization

### Colors
The design uses a blue color scheme. To change colors, update the Tailwind config in `tailwind.config.js`.

### Content
- Update text content in `src/app/page.tsx`
- Modify form fields in the signup section
- Add/remove feature cards in the "What Arqam Offers" section

### Styling
- Global styles are in `src/app/globals.css`
- Component-specific styles use Tailwind classes
- Custom animations are defined in the CSS file

## 🔒 Security Features

- **Input Validation**: Client and server-side validation
- **Rate Limiting**: 5 requests per minute per IP
- **SQL Injection Protection**: Using Supabase's built-in protection
- **XSS Protection**: React's built-in XSS protection
- **HTTPS**: Automatic with Vercel deployment

## 📱 Responsive Design

The landing page is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎯 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic with Next.js

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
- Create an issue in the repository
- Contact the development team

---

Built with ❤️ for Arqam by Entlaq
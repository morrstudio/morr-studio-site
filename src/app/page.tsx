'use client';

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { ArrowRight, Zap, Rocket, TrendingUp, Users, Brain, Eye, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Component() {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setShowFloatingCTA(scrollPosition > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    const formData = new FormData(event.currentTarget)
    const applicationData = Object.fromEntries(formData)

    // Updated required fields to match Airtable column names
    const requiredFields = ['Name', 'Email', 'Experience', 'Approach to Building']
    const missingFields = requiredFields.filter(field => !applicationData[field])

    if (missingFields.length > 0) {
      setSubmitMessage(`Please fill in the following required fields: ${missingFields.join(', ')}`)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      })

      if (response.ok) {
        setSubmitMessage('Application submitted successfully!')
        event.currentTarget.reset()
      } else {
        const errorData = await response.json()
        setSubmitMessage(`Error submitting application: ${errorData.message || 'Please try again.'}`)
      }
    } catch (error) {
      console.error('Error:', error)
      setSubmitMessage('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleScheduleCall = () => {
    window.open('https://calendly.com/max-morrstudio/30min', '_blank')
  }

  const handleJoinMorrStudio = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleApplyToCoFound = () => {
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
  }

  const keyPillars = [
    { icon: Rocket, title: "Rapid Innovation Pipeline", description: "Leverage AI tools to accelerate development cycles. From concept to MVP in 4-6 weeks." },
    { icon: Brain, title: "AI-First Product Philosophy", description: "Focus on creating niche, AI-powered tools that solve real problems and get smarter over time." },
    { icon: Users, title: "Community-Driven Development", description: "Foster a vibrant ecosystem of indie builders and early adopters. Leverage collective intelligence." },
    { icon: Eye, title: "Transparent Building Process", description: "Share our journey, learnings, and metrics openly. Turn our building process into a powerful marketing asset." }
  ]

  const sellingPoints = [
    { icon: DollarSign, title: "$250K Committed Funding", description: "Ready capital to kickstart development and growth. No need to chase investors - let&apos;s focus on building from day one." },
    { icon: Users, title: "True Co-Founder Opportunity", description: "Equal partnership (45/45 equity split) with real decision-making power. Shape a visionary AI-powered SaaS studio." },
    { icon: Zap, title: "AI-First Advantage", description: "Leverage cutting-edge AI tools to develop products faster and smarter than traditional SaaS companies." },
    { icon: Rocket, title: "Rapid MVP Pipeline", description: "From concept to live product in 4-6 weeks. Iterate quickly, fail fast, and find product-market fit at unprecedented speeds." },
    { icon: TrendingUp, title: "Built-In Growth Engine", description: "Our studio model creates a marketing flywheel effect. Each new product amplifies the reach of the entire portfolio." },
    { icon: DollarSign, title: "Revenue Sharing Model", description: "Benefit from every success in our product portfolio. Your hard work compounds as the studio grows." }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b border-gray-300 sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <Link className="flex items-center justify-center" href="#">
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">MORR STUDIO</span>
        </Link>
        <nav className="hidden md:flex gap-4 sm:gap-6">
          {["Key Pillars", "USPs", "Founder", "Co-Founder", "Apply"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors" href={`#${item.toLowerCase().replace(" ", "-")}`}>
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>
        <Button
          onClick={handleApplyToCoFound}
          className="bg-gray-800 hover:bg-gray-900 text-white transition-colors duration-300"
        >
          Apply to Co-Found
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div 
              className="flex flex-col items-center space-y-4 text-center"
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              <motion.h1 
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800"
                variants={fadeInUp}
              >
                AI-Powered Micro SaaS Factory
              </motion.h1>
              <motion.p 
                className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-2xl/relaxed xl:text-3xl/relaxed"
                variants={fadeInUp}
              >
                From Idea to MRR in Weeks: Building the Future of AI-Driven SaaS, Together
              </motion.p>
              <motion.div variants={fadeInUp} className="flex gap-4 mt-6">
                <Link
                  href="#apply"
                  onClick={handleJoinMorrStudio}
                  className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-3 text-lg font-medium text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                >
                  Join Morr Studio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Button
                  onClick={handleScheduleCall}
                  className="h-12 px-6 py-3 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
                >
                  Schedule a Call
                  <Calendar className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section id="key-pillars" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Key Pillars
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {keyPillars.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden h-full">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-br from-gray-200 to-gray-300 p-3 rounded-full">
                          <item.icon className="h-8 w-8 text-gray-700" />
                        </div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section id="usps" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4 text-center"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Unique Selling Points</h2>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed">
                Our vision for Morr Studio - backed by committed funding and ready to turn dreams into reality.
              </p>
            </motion.div>
            <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
              {sellingPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <point.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{point.title}</h3>
                      </div>
                      <p className="text-gray-600">{point.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section id="founder" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">Meet the Founder: The Spark Behind Morr Studio</h2>
              <div className="space-y-6 text-gray-600 text-lg">
                <h3 className="text-2xl font-bold text-gray-900">The Quick Rundown</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Former fintech analyst at CB Insights (yeah, I was that trends guy)</li>
                  <li>Early crypto adopter and DeFi degen for 4 years (survived the highs and lows)</li>
                  <li>Now, I'm all in on AI-powered Micro SaaS (and I think you should be too)</li>
                </ul>
                <h3 className="text-2xl font-bold text-gray-900 mt-6">The Journey</h3>
                <p>
                  From analyzing fintech trends at CB Insights to diving deep into the world of DeFi, I've always been at the forefront of emerging technologies. The AI revolution was the missing piece that brought it all together.
                </p>
                <p>
                  Morr Studio is the culmination of these experiences - a place where we can leverage AI to turn ideas into shippable products at lightning speed,   all while supporting and learning from each other.
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-6">What I'm Bringing to the Table</h3>
                <ul className="list-decimal pl-6 space-y-2">
                  <li>Trend-spotting prowess honed at CB Insights and in the crypto world</li>
                  <li>$250K of my own money invested - that's how much I believe in this vision</li>
                  <li>A vision for collaborative innovation in the AI-powered SaaS space</li>
                </ul>
                
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={handleScheduleCall}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 transition-colors duration-300"
                  >
                    Schedule a Call
                    <Calendar className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        <section id="co-founder" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">Seeking a Visionary Technical Co-founder / CEO</h2>
              <div className="space-y-6 text-gray-600 text-lg">
                <p>
                  We're looking for a technical co-founder to join as CEO, bringing their expertise in AI/ML and product development to lead Morr Studio into the future of micro SaaS.
                </p>
                <h3 className="text-2xl font-bold text-gray-900">Key Responsibilities:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Architect and oversee the development of our AI-powered SaaS products</li>
                  <li>Lead the product strategy from ideation to launch and beyond</li>
                  <li>Spearhead our transparent building process, sharing insights and progress regularly</li>
                </ul>
                <h3 className="text-2xl font-bold text-gray-900 mt-6">Ideal Candidate Profile:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Strong technical background in AI/ML and full-stack development</li>
                  <li>Proven track record of shipping successful SaaS products</li>
                  <li>Existing following on social media or YouTube in the tech space (10k+ followers)</li>
                  <li>Passion for educating and building in public</li>
                  <li>Entrepreneurial mindset with the ability to execute quickly and pivot when necessary</li>
                </ul>
                <h3 className="text-2xl font-bold text-gray-900 mt-6">Why Morr Studio Matters</h3>
                <p>
                  We're creating a collaborative space where AI-powered tools can be rapidly developed and shipped, turning "idea people" into "shipping machines" with the power of AI. Our flywheel will amplify every product we launch, all powered by the latest in AI technology.
                </p>
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={handleScheduleCall}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-8 py-4 transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    Schedule a Call
                    <Calendar className="ml-2 h-6 w-6" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        <section id="apply" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div 
              className="flex flex-col items-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Shape the Future of AI-Driven SaaS?</h2>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-2xl/relaxed">
                  If you're excited about leading the charge in creating the next generation of AI-powered SaaS products, we want to hear from you.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                  <Input placeholder="Your Name" name="Name" type="text" required className="bg-white" />
                  <Input placeholder="Your Email" name="Email" type="email" required className="bg-white" />
                  <Textarea placeholder="Tell us about your experience in AI/ML and SaaS product development" name="Experience" required className="bg-white" />
                  <Input placeholder="LinkedIn Profile" name="LinkedIn Profile" type="url" className="bg-white" />
                  <Input placeholder="GitHub Profile" name="GitHub Profile" type="url" className="bg-white" />
                  <div className="flex gap-4">
                    <Input placeholder="X (Twitter) Profile" name="X Account" type="url" className="bg-white flex-1" />
                    <Input placeholder="YouTube Channel" name="YouTube Channel" type="url" className="bg-white flex-1" />
                  </div>
                  <Textarea placeholder="Describe your approach to building in public" name="Approach to Building" required className="bg-white" />
                  <div className="flex gap-4">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:brightness-110 transition-all duration-300" 
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Apply to Co-Found'}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                      onClick={handleScheduleCall}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
                    >
                      Schedule a Call
                      <Calendar className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </form>
                {submitMessage && (
                  <p className={`text-center ${submitMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                    {submitMessage}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="py-6 w-full border-t bg-gradient-to-b from-gray-100 to-white">
        <div className="container px-4 md:px-6 mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-600">© 2024 Morr Studio. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-sm hover:underline underline-offset-4 text-gray-600" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm hover:underline underline-offset-4 text-gray-600" href="#">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              onClick={handleScheduleCall}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Schedule a Call
              <Calendar className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
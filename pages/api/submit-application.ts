import type { NextApiRequest, NextApiResponse } from 'next'
import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, experience, linkedin, github, social, approach } = req.body

    await base('Applications').create([
      {
        fields: {
          Name: name,
          Email: email,
          Experience: experience,
          LinkedIn: linkedin,
          GitHub: github,
          Social: social,
          Approach: approach,
          Status: 'New',
          SubmittedAt: new Date().toISOString()
        }
      }
    ])

    res.status(200).json({ message: 'Application submitted successfully' })
  } catch (error) {
    console.error('Error submitting application:', error)
    res.status(500).json({ message: 'Error submitting application' })
  }
}
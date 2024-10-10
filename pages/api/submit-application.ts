import { NextApiRequest, NextApiResponse } from 'next'
import Airtable from 'airtable'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { name, email, experience, linkedin, github, social, approach } = req.body

  if (!name || !email || !experience || !linkedin || !github || !social || !approach) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!)

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
        },
      },
    ])

    res.status(200).json({ message: 'Application submitted successfully' })
  } catch (error) {
    console.error('Airtable submission error:', error)
    res.status(500).json({ message: 'Error submitting to Airtable' })
  }
}
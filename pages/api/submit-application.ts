import { NextApiRequest, NextApiResponse } from 'next'
import Airtable from 'airtable'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { Name, Email, Experience, 'Approach to Building': Approach, ...optionalFields } = req.body;

    // Check required fields
    if (!Name || !Email || !Experience || !Approach) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    try {
      // Your Airtable submission logic here
      // Make sure to include both required and optional fields when submitting to Airtable

      res.status(200).json({ message: 'Application submitted successfully' });
    } catch (error) {
      console.error('Error submitting to Airtable:', error);
      res.status(500).json({ message: 'Error submitting application' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
import { NextApiRequest, NextApiResponse } from 'next'
import Airtable from 'airtable'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('Received form data:', req.body);

    const expectedFields = ['Name', 'Email', 'Experience', 'Approach to Building', 'LinkedIn Profile', 'GitHub Profile', 'X Account', 'YouTube Channel'];
    const missingFields = expectedFields.filter(field => !(field in req.body));

    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields);
      return res.status(400).json({ message: `Missing fields: ${missingFields.join(', ')}` });
    }

    const { Name, Email, Experience, 'Approach to Building': Approach, ...optionalFields } = req.body;

    try {
      // Check if environment variables are set
      const apiKey = process.env.AIRTABLE_API_KEY;
      const baseId = process.env.AIRTABLE_BASE_ID;
      if (!apiKey || !baseId) {
        throw new Error('Airtable API key or Base ID is missing');
      }

      // Initialize Airtable
      const base = new Airtable({apiKey}).base(baseId);

      console.log('Attempting to create record in Airtable');
      
      // Create a new record in your Airtable base
      const record = await base('Applications').create({
        Name,
        Email,
        Experience,
        'Approach to Building': Approach,
        'LinkedIn Profile': optionalFields['LinkedIn Profile'],
        'GitHub Profile': optionalFields['GitHub Profile'],
        'X Account': optionalFields['X Account'],
        'YouTube Channel': optionalFields['YouTube Channel'],
      });

      console.log('Record created successfully:', record.getId());

      res.status(200).json({ message: 'Application submitted successfully' });
    } catch (error) {
      console.error('Error submitting to Airtable:', error);
      res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
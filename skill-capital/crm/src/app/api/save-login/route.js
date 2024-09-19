import { promises as fs } from 'fs';
import path from 'path';

// This handler deals with POST requests and saves data to login-data.json
export async function POST(req) {
  try {
    const formData = await req.json();  // Get the form data from request body

    // Define the path to the JSON file where the form data will be saved
    const filePath = path.join(process.cwd(), 'src', 'app', 'Data', 'login-data.json');

    // Read the current content of the file if it exists
    const existingData = await fs.readFile(filePath, 'utf8').catch(() => '[]');
    const parsedData = JSON.parse(existingData);

    // Append the new form data
    parsedData.push(formData);

    // Write the updated data back to the JSON file
    await fs.writeFile(filePath, JSON.stringify(parsedData, null, 2));

    return new Response(JSON.stringify({ message: 'Login data saved successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving login data:', error);
    return new Response(JSON.stringify({ message: 'Error saving login data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        console.log({ req });
    } else {
        // Handle any other HTTP method
    }
}
  
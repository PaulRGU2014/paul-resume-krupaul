import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();
    const { email } = body;

    // Basic validation to ensure email is present
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Additional email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Create a write-enabled client for this operation
    const writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_WRITE_TOKEN, // Use write token for creating documents
    });

    // Check if email already exists
    const existingSubscription = await writeClient.fetch(
      `*[_type == "subscriptionForm" && email == $email][0]`,
      { email }
    );

    if (existingSubscription) {
      return NextResponse.json(
        {
          error: 'This email is already subscribed to our newsletter.',
          alreadySubscribed: true
        },
        { status: 409 } // Conflict status code
      );
    }

    // Create a new document in Sanity
    const document = {
      _type: 'subscriptionForm',
      email: email,
      createdAt: new Date().toISOString(),
    };

    // Use the client's create method to save the document
    const createdDocument = await writeClient.create(document);

    // Return success response with the created document
    return NextResponse.json(
      {
        message: 'Successfully subscribed!',
        document: createdDocument
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating subscription:', error);
    
    // Return appropriate error response
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
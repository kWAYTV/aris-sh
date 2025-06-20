'use server';

import type { ReactElement } from 'react';

import { env } from '../../env';
import { resend } from '../../lib/resend';
import { type ApiResponse } from '../../types/api';

interface SendEmailParams {
  to: string;
  subject: string;
  html?: string;
  react?: ReactElement;
}

interface SendEmailResult {
  id: string;
  message?: string;
}

export async function sendEmailAction({
  to,
  subject,
  html,
  react
}: SendEmailParams): Promise<ApiResponse<SendEmailResult>> {
  try {
    // Input validation
    if (!to || typeof to !== 'string' || !to.includes('@')) {
      return {
        success: false,
        error: 'Invalid email address'
      };
    }

    if (
      !subject ||
      typeof subject !== 'string' ||
      subject.trim().length === 0
    ) {
      return {
        success: false,
        error: 'Subject is required'
      };
    }

    if (!html && !react) {
      return {
        success: false,
        error: 'Email content (html or react) is required'
      };
    }

    const baseEmailData = {
      from: env.RESEND_FROM_EMAIL,
      to: to.trim(),
      subject: subject.trim()
    };

    const emailData = react
      ? { ...baseEmailData, react }
      : { ...baseEmailData, html: html! };

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      return {
        success: false,
        error: error.message || 'Failed to send email'
      };
    }

    if (!data?.id) {
      return {
        success: false,
        error: 'Email was sent but no confirmation received'
      };
    }

    return {
      success: true,
      data: {
        id: data.id,
        message: 'Email sent successfully'
      }
    };
  } catch {
    return {
      success: false,
      error: 'Failed to send email'
    };
  }
}

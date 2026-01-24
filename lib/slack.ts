export type ContactPayload = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

const SLACK_API_BASE = 'https://slack.com/api';

async function slackApi(endpoint: string, token: string, init: RequestInit) {
  const res = await fetch(`${SLACK_API_BASE}/${endpoint}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${token}`,
      ...(init.headers || {}),
    },
  });
  const data = await res.json();
  return { ok: data.ok === true, data };
}

export async function sendSlackDM(payload: ContactPayload) {
  const token = process.env.SLACK_BOT_TOKEN;
  const targetUserId = process.env.SLACK_TARGET_USER_ID;
  const targetUserEmail = process.env.SLACK_TARGET_USER_EMAIL;

  if (!token) {
    console.warn('[SLACK] Missing SLACK_BOT_TOKEN; skipping DM');
    return { ok: false, reason: 'missing-token' };
  }

  let userId = targetUserId || '';

  if (!userId && targetUserEmail) {
    const lookup = await slackApi(
      `users.lookupByEmail?email=${encodeURIComponent(targetUserEmail)}`,
      token,
      { method: 'GET' }
    );
    if (lookup.ok && lookup.data?.user?.id) {
      userId = lookup.data.user.id as string;
    } else {
      console.warn('[SLACK] Failed to lookup user by email', lookup.data);
    }
  }

  if (!userId) {
    console.warn('[SLACK] Missing SLACK_TARGET_USER_ID/EMAIL; skipping DM');
    return { ok: false, reason: 'missing-target' };
  }

  const open = await slackApi('conversations.open', token, {
    method: 'POST',
    body: JSON.stringify({ users: userId }),
  });
  if (!open.ok) {
    console.warn('[SLACK] Failed to open conversation', open.data);
    return { ok: false, reason: 'open-failed' };
  }

  const channel = open.data?.channel?.id as string;
  if (!channel) {
    console.warn('[SLACK] No channel id in conversations.open response');
    return { ok: false, reason: 'no-channel' };
  }

  const text = `*New website inquiry*\n• *Name*: ${payload.name}\n• *Email*: ${payload.email}\n• *Topic*: ${payload.topic}\n• *Message*: ${payload.message}`;

  const post = await slackApi('chat.postMessage', token, {
    method: 'POST',
    body: JSON.stringify({ channel, text, mrkdwn: true }),
  });
  if (!post.ok) {
    console.warn('[SLACK] Failed to post message', post.data);
    return { ok: false, reason: 'post-failed' };
  }

  return { ok: true };
}

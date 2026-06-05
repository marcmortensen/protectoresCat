export async function verifyRecaptcha(
  token: string,
  secretKey: string,
  remoteip?: string
): Promise<boolean> {
  const params = new URLSearchParams({
    secret: secretKey,
    response: token,
    ...(remoteip ? { remoteip } : {}),
  });

  let response: Response;
  try {
    response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
  } catch {
    return false;
  }

  if (!response.ok) {
    return false;
  }

  const data = (await response.json()) as {
    success: boolean;
    "error-codes"?: string[];
  };
  return data.success === true;
}

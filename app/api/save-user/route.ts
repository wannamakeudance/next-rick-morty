import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") ?? "";

    let username = "";
    let jobTitle = "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      username = body.username;
      jobTitle = body.jobTitle;
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      // If URL-encoded, use `request.formData()`
      const formData = await request.formData();
      username = formData.get("username") as string;
      jobTitle = formData.get("jobTitle") as string;
    } else {
      // Unsupported Content-Type
      return NextResponse.json(
        { message: "Unsupported Content-Type" },
        { status: 400 }
      );
    }

    if (!username || !jobTitle) {
      return NextResponse.json(
        { message: "Invalid data. Username and Job Title are required." },
        { status: 400 }
      );
    }

    console.log("User data received:", { username, jobTitle });

    const { protocol, host } = request.nextUrl;
    const redirectUrl = `${protocol}//${host}/info`;
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set("username", username);
    response.cookies.set("jobTitle", jobTitle);

    return response;
  } catch (error) {
    console.error("Error handling POST request:", error);

    return NextResponse.json(
      { message: "Internal Server Error", error: JSON.stringify(error) },
      { status: 500 }
    );
  }
}

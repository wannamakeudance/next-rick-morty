import { NextRequest, NextResponse } from "next/server";
import { POST } from "./route";

jest.mock("next/server", () => {
  const originalModule = jest.requireActual("next/server");

  return {
    __esModule: true, // Use it when dealing with ESM
    ...originalModule,
    NextResponse: {
      ...originalModule.NextResponse,
      json: jest.fn(),
      redirect: jest.fn().mockReturnValue({
        cookies: {
          set: jest.fn(),
        },
      }),
    },
  };
});

// Access the mocked functions
const mockJson = NextResponse.json as jest.Mock;
const mockRedirect = NextResponse.redirect as jest.Mock;

describe("POST /api/save-user", () => {
  afterEach(() => {
    jest.resetAllMocks();
    mockRedirect.mockReturnValue({
      cookies: {
        set: jest.fn(),
      },
    });
  });

  /**
   * Helper function to create a mock NextRequest
   * @param body - The request body
   * @param contentType - The Content-Type header
   * @returns A mocked NextRequest object
   */
  const createMockRequest = (body: any, contentType: string) => {
    return {
      headers: {
        get: jest.fn().mockImplementation((header: string) => {
          if (header.toLowerCase() === "content-type") {
            return contentType;
          }
          return null;
        }),
      },
      json: jest.fn().mockResolvedValue(body),
      formData: jest
        .fn()
        .mockResolvedValue(new URLSearchParams(Object.entries(body))),
      nextUrl: {
        protocol: "http:",
        host: "localhost",
      },
    } as unknown as NextRequest;
  };

  it("should handle POST with application/json and valid data", async () => {
    const requestBody = { username: "JohnDoe", jobTitle: "Developer" };
    const req = createMockRequest(requestBody, "application/json");

    await POST(req);

    // Verify that request.json was called
    expect(req.json).toHaveBeenCalled();

    // Verify that NextResponse.redirect was called with the correct URL
    expect(mockRedirect).toHaveBeenCalledWith("http://localhost/info");

    // Access the response returned by redirect
    const redirectResponse = mockRedirect.mock.results[0].value;

    // Verify that cookies.set was called correctly
    expect(redirectResponse.cookies.set).toHaveBeenCalledWith(
      "username",
      "JohnDoe"
    );
    expect(redirectResponse.cookies.set).toHaveBeenCalledWith(
      "jobTitle",
      "Developer"
    );
  });

  it("should handle POST with application/json and missing username", async () => {
    const requestBody = { jobTitle: "Developer" };
    const req = createMockRequest(requestBody, "application/json");

    await POST(req);

    // Verify that request.json was called
    expect(req.json).toHaveBeenCalled();

    // Verify that NextResponse.json was called with the correct error message and status
    expect(mockJson).toHaveBeenCalledWith(
      { message: "Invalid data. Username and Job Title are required." },
      { status: 400 }
    );
  });

  it("should handle POST with application/json and missing jobTitle", async () => {
    const requestBody = { username: "JohnDoe" };
    const req = createMockRequest(requestBody, "application/json");

    await POST(req);
    expect(req.json).toHaveBeenCalled();
    expect(mockJson).toHaveBeenCalledWith(
      { message: "Invalid data. Username and Job Title are required." },
      { status: 400 }
    );
  });

  it("should handle POST with application/x-www-form-urlencoded and valid data", async () => {
    const requestBody = { username: "JaneDoe", jobTitle: "Designer" };
    const req = createMockRequest(
      requestBody,
      "application/x-www-form-urlencoded"
    );

    await POST(req);

    // Verify that request.formData was called
    expect(req.formData).toHaveBeenCalled();
    expect(mockRedirect).toHaveBeenCalledWith("http://localhost/info");
    const redirectResponse = mockRedirect.mock.results[0].value;
    expect(redirectResponse.cookies.set).toHaveBeenCalledWith(
      "username",
      "JaneDoe"
    );
    expect(redirectResponse.cookies.set).toHaveBeenCalledWith(
      "jobTitle",
      "Designer"
    );
  });

  it("should handle POST with application/x-www-form-urlencoded and missing username", async () => {
    const requestBody = { jobTitle: "Designer" };
    const req = createMockRequest(
      requestBody,
      "application/x-www-form-urlencoded"
    );

    await POST(req);

    // Verify that request.formData was called
    expect(req.formData).toHaveBeenCalled();

    // Verify that NextResponse.json was called with the correct error message and status
    expect(mockJson).toHaveBeenCalledWith(
      { message: "Invalid data. Username and Job Title are required." },
      { status: 400 }
    );
  });

  it("should handle POST with unsupported Content-Type", async () => {
    const req = createMockRequest({}, "text/plain");

    await POST(req);

    // Verify that NextResponse.json was called with the correct error message and status
    expect(mockJson).toHaveBeenCalledWith(
      { message: "Unsupported Content-Type" },
      { status: 400 }
    );
  });

  it("should handle errors and return 500", async () => {
    // Create a mock request where request.json throws an error
    const req = {
      headers: {
        get: jest.fn().mockImplementation((header: string) => {
          if (header.toLowerCase() === "content-type") {
            return "application/json";
          }
          return null;
        }),
      },
      json: jest.fn().mockRejectedValue(new Error("Test Error")),
      formData: jest.fn(),
      nextUrl: {
        protocol: "http:",
        host: "localhost",
      },
    } as unknown as NextRequest;

    await POST(req);

    expect(req.json).toHaveBeenCalled();
    expect(mockJson).toHaveBeenCalledWith(
      {
        message: "Internal Server Error",
        error: JSON.stringify(new Error("Test Error")),
      },
      { status: 500 }
    );
  });
});

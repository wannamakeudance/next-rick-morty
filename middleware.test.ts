import { middleware } from "./middleware";
import { NextRequest, NextResponse } from "next/server";

describe("Middleware", () => {
  /**
   * Helper function to create a mock NextRequest
   * @param pathname - The URL pathname
   * @param cookies - An object representing cookies
   * @returns A mocked NextRequest object
   */
  const createMockRequest = (
    pathname: string,
    cookies: Record<string, string>
  ) => {
    return {
      nextUrl: {
        pathname,
        origin: "http://localhost",
        protocol: "http",
        host: "localhost",
        search: "",
        hash: "",
      },
      cookies: {
        get: (name: string) => {
          if (name in cookies) {
            return { value: cookies[name] };
          }
          return undefined;
        },
      },
      url: `http://localhost${pathname}`,
    } as unknown as NextRequest;
  };
  it("allows access to the root path regardless of cookies", () => {
    const request = createMockRequest("/", {});
    const response = middleware(request);
    expect(response.status).toEqual(307);
  });

  it("allows access to /info/somepath with valid cookies", () => {
    const request = createMockRequest("/info/somepath", {
      username: "JohnDoe",
      jobTitle: "Developer",
    });
    const response = middleware(request);
    expect(response).toEqual(NextResponse.next());
  });

  it("redirects to root when accessing /info/somepath without cookies", () => {
    const request = createMockRequest("/info/somepath", {});
    const response = middleware(request);
    expect(response.headers.get("Location")).toBe("http://localhost/");
    expect(response.status).toBe(307); // 307 Temporary Redirect is the default for NextResponse.redirect
  });

  it("redirects to root when accessing /info/somepath without username", () => {
    const request = createMockRequest("/info/somepath", {
      jobTitle: "Developer",
    });
    const response = middleware(request);
    expect(response.headers.get("Location")).toBe("http://localhost/");
    expect(response.status).toBe(307);
  });

  it("redirects to root when accessing /info/somepath without jobTitle", () => {
    const request = createMockRequest("/info/somepath", {
      username: "JohnDoe",
    });
    const response = middleware(request);
    expect(response.headers.get("Location")).toBe("http://localhost/");
    expect(response.status).toBe(307);
  });
});

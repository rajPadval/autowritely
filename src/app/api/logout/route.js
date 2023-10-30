import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout Sucessfull",
    });
    response.cookies.set("token", "", { expires: new Date(0), httpOnly: true });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};

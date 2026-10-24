import type { APIRoute } from "astro";
import illustration from "../assets/images/call-to-action.png?inline";
import { createOgImageSvg } from "../lib/brand";
import { renderPng } from "../lib/png";

export const GET: APIRoute = () => renderPng(createOgImageSvg(illustration));

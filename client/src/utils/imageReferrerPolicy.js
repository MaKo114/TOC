// VLR placeholders reject external referrers; owcdn portraits need one in browsers.
export function imageReferrerPolicy(src) {
  if (typeof src === "string" && /^https?:\/\/(?:www\.)?vlr\.gg\//i.test(src)) {
    return "no-referrer";
  }
  return "strict-origin-when-cross-origin";
}

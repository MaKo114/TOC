import assert from "node:assert/strict";
import test from "node:test";
import { imageReferrerPolicy } from "../src/utils/imageReferrerPolicy.js";

test("VLR placeholders omit the external referrer", () => {
  for (const src of [
    "https://vlr.gg/img/base/ph/sil.png",
    "https://www.vlr.gg/img/vlr/tmp/vlr.png",
  ]) {
    assert.equal(imageReferrerPolicy(src), "no-referrer");
  }
});

test("CDN logos and portraits retain the browser referrer", () => {
  for (const src of [
    "https://owcdn.net/img/6466d79e1ed40.png",
    "https://owcdn.net/img/680a926893d7b.png",
  ]) {
    assert.equal(imageReferrerPolicy(src), "strict-origin-when-cross-origin");
  }
});

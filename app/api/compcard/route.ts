import {
  Document,
  Page,
  Text,
  View,
  Image as PdfImage,
  StyleSheet,
  renderToBuffer,
  Font,
} from "@react-pdf/renderer";
import path from "node:path";
import React from "react";
import { PROFILE } from "../../data/profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FONT_DIR = path.join(process.cwd(), "public", "fonts");

Font.register({
  family: "Serif",
  fonts: [
    { src: path.join(FONT_DIR, "instrument-serif.ttf"), fontStyle: "normal" },
    { src: path.join(FONT_DIR, "instrument-serif-italic.ttf"), fontStyle: "italic" },
  ],
});
Font.register({
  family: "Sans",
  src: path.join(FONT_DIR, "inter.ttf"),
});

const abs = (rel: string) => path.join(process.cwd(), "public", rel);

const s = StyleSheet.create({
  page: { backgroundColor: "#0a0a0a", color: "#eceae5", padding: 0, fontFamily: "Sans" },
  coverBox: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center" },
  cover: { maxWidth: "100%", maxHeight: "100%", objectFit: "contain" },
  dim: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#00000022" },
  top: {
    position: "absolute", top: 28, left: 32, right: 32,
    flexDirection: "row", justifyContent: "space-between",
    fontSize: 7, letterSpacing: 2, textTransform: "uppercase",
  },
  bottom: { position: "absolute", top: 64, left: 32, right: 32 },
  name: { fontFamily: "Serif", fontSize: 54, letterSpacing: -1, lineHeight: 0.95 },
  nameI: { fontFamily: "Serif", fontStyle: "italic", fontSize: 54, letterSpacing: -1, lineHeight: 0.95, marginLeft: 40 },
  sub: {
    marginTop: 14, flexDirection: "row", justifyContent: "space-between",
    fontSize: 7, letterSpacing: 2, textTransform: "uppercase",
  },

  back: { backgroundColor: "#eceae5", color: "#101010", padding: 28 },
  head: {
    flexDirection: "row", justifyContent: "space-between",
    fontSize: 7, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10,
  },
  title: { fontFamily: "Serif", fontSize: 30, letterSpacing: -1, marginBottom: 8 },
  grid: { flexDirection: "row", flexWrap: "wrap", marginBottom: 12 },
  cell: { width: "50%", height: 108, padding: 2 },
  cellIn: { width: "100%", height: "100%", overflow: "hidden" },
  cellImg: { width: "100%", height: "100%", objectFit: "contain" },
  statsWrap: { borderTopWidth: 0.5, borderTopColor: "#00000025" },
  row: {
    flexDirection: "row", justifyContent: "space-between",
    paddingVertical: 3.5, borderBottomWidth: 0.5, borderBottomColor: "#00000015",
    alignItems: "center",
  },
  lbl: { fontSize: 7, letterSpacing: 2, textTransform: "uppercase", color: "#666", width: 70 },
  val: { fontFamily: "Serif", fontSize: 14, flex: 1, textAlign: "center" },
  imp: { fontSize: 7, letterSpacing: 2, textTransform: "uppercase", color: "#999", width: 60, textAlign: "right" },
  foot: {
    marginTop: 10, flexDirection: "row", justifyContent: "space-between",
    fontSize: 7, letterSpacing: 2, textTransform: "uppercase", color: "#555",
  },
});

const PAGE_SIZE: [number, number] = [396, 612];

function Card() {
  const cover = abs("/media/gallery/001.jpg");
  const picks = ["002.jpg", "010.jpg", "040.jpg", "080.jpg"].map((f) => abs(`/media/gallery/${f}`));
  const h = React.createElement;

  return h(
    Document,
    null,
    h(
      Page,
      { size: PAGE_SIZE, style: s.page },
      h(
        View,
        { style: s.coverBox },
        h(PdfImage, { src: cover, style: s.cover })
      ),
      h(View, { style: s.dim }),
      h(
        View,
        { style: s.top },
        h(Text, null, "Portfolio — MMXXVI"),
        h(Text, null, "Comp Card")
      ),
      h(
        View,
        { style: s.bottom },
        h(Text, { style: s.name }, "Alexandru"),
        h(Text, { style: s.nameI }, "Chițea"),
        h(
          View,
          { style: s.sub },
          h(Text, null, `${PROFILE.nationality} · ${PROFILE.city}`),
          h(Text, null, PROFILE.agency)
        )
      )
    ),
    h(
      Page,
      { size: PAGE_SIZE, style: s.back },
      h(
        View,
        { style: s.head },
        h(Text, null, "Alexandru Chițea"),
        h(Text, null, "02 / Back")
      ),
      h(Text, { style: s.title }, "Measurements."),
      h(
        View,
        { style: s.grid },
        ...picks.map((p) =>
          h(
            View,
            { key: p, style: s.cell },
            h(View, { style: s.cellIn }, h(PdfImage, { src: p, style: s.cellImg }))
          )
        )
      ),
      h(
        View,
        { style: s.statsWrap },
        ...PROFILE.stats.map((st) =>
          h(
            View,
            { key: st.key, style: s.row },
            h(Text, { style: s.lbl }, st.key),
            h(Text, { style: s.val }, st.value),
            h(Text, { style: s.imp }, st.imperial)
          )
        )
      ),
      h(
        View,
        { style: s.foot },
        h(Text, null, `@${PROFILE.instagram}`),
        h(Text, null, PROFILE.email)
      )
    )
  );
}

export async function GET() {
  const buf = await renderToBuffer(Card() as React.ReactElement);
  return new Response(new Uint8Array(buf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="alexandru-chitea-compcard.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}

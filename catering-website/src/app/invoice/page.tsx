"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import InvoiceView from "@/components/InvoiceView";

function InvoicePageContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";

  return (
    <div className="page-shell" style={{ paddingTop: "2rem" }}>
      <InvoiceView invoiceId={id} />
    </div>
  );
}

export default function InvoicePage() {
  return (
    <Suspense fallback={null}>
      <InvoicePageContent />
    </Suspense>
  );
}

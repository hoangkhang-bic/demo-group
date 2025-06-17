import MbHeader from "@/components/bic-components/mb-header/mb-header";
import PageAndroidTransition from "@/components/wrapper-transistion/page.android.transition";

export default function NotFoundPage() {
  return (
    <PageAndroidTransition>
      <MbHeader title="Not Found" />
      <div>NotFoundPage</div>
    </PageAndroidTransition>
  );
}

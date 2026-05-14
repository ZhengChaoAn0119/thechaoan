import SuccessRedirect from "./SuccessRedirect";

export default async function RegisterSuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <SuccessRedirect locale={locale} />;
}

import ForgotPasswordNotice from "./ForgotPasswordNotice";

export default async function ForgotPasswordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ForgotPasswordNotice locale={locale} />;
}

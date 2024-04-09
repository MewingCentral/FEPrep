import { ResetPasswordWithToken } from "./reset-password-with-token";

export default async function Page({ params }: { params: { token: string } }) {
  return <ResetPasswordWithToken token={params.token} />;
}

export default function AuthScreen({ authUrl }: { authUrl: string }) {
  alert(authUrl);
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center px-28">
      <p>
        Failed to inject custom code! Perhaps you created this site after installing the app. In order to use the app
        with this site please authenticate again
      </p>
      <a href={authUrl} target="_top">
        Authenticate
      </a>
    </div>
  );
}

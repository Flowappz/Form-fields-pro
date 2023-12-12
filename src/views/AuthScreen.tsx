export default function AuthScreen({ authUrl }: { authUrl: string }) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center px-28">
      <p>
        Failed to inject custom code! Perhaps you created this site after installing the app. In order to use the app
        with this site please authenticate again
      </p>
      <a
        href={authUrl}
        target="_top"
        className="mt-10 boxShadows-action-colored mb-[60px] bg-[#0073E6] text-center text-[0.77rem] py-1 px-3 border-[#363636] border-[1px] rounded-[4px]"
        onKeyDown={() => (window.parent.location.href = authUrl)}
      >
        Authenticate
      </a>
    </div>
  );
}

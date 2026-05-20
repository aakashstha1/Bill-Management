function AuthLoader() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin" />

        {/* Text */}
        <p className="text-sm text-gray-500 font-medium">
          Checking authentication...
        </p>
      </div>
    </div>
  );
}

export default AuthLoader;

import { useState } from "react";

const ProfileBiosite = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-screen">
      {/* Loader visible solo mientras loading sea true */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75" />
          <span className="ml-4 text-gray-600">Cargando...</span>
        </div>
      )}

      <iframe
        className="w-full h-full"
        src="https://visitaecuador.com/vesite"
        onLoad={() => setLoading(false)}
      ></iframe>
    </div>
  );
};

export default ProfileBiosite;

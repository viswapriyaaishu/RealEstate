import { createContext, useEffect, useState } from "react";

const CloudinaryScriptContext = createContext();

function UploadWidget({ uwConfig, setavatar }) {
  const [loaded, setLoaded] = useState(false);

  // Load the Cloudinary upload widget script only once
  useEffect(() => {
    if (window.cloudinary) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.async = true;
    script.id = "cloudinary-script";
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
  }, []);

  const openWidget = () => {
    if (!window.cloudinary || !loaded) {
      alert("Cloudinary widget is still loading. Try again in a second.");
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      uwConfig,
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("✅ Uploaded image info:", result.info);
          setavatar(prev=>([...prev,result.info.secure_url]));
        } else if (error) {
          console.error("❌ Cloudinary upload error:", error);
        }
      }
    );

    widget.open();
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        type="button"
        className="cloudinary-button"
        onClick={openWidget}
        disabled={!loaded}
      >
        {loaded ? "Upload" : "Loading Widget..."}
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };

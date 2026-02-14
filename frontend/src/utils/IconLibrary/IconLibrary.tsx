import { BsEnvelopeAtFill, BsTelephoneFill } from "react-icons/bs";
import { FaFacebook, FaLinkedin, FaYoutube, FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

export function Icon({ icon_name }: { icon_name: string }) {
  switch (icon_name) {
    case "email":
      return <BsEnvelopeAtFill />;
    case "facebook":
      return <FaFacebook />;
    case "github":
      return <FaGithub />;
    case "instagram":
      return <FaInstagram />;
    case "linkedin":
      return <FaLinkedin />;
    case "phone":
      return <BsTelephoneFill />;
    case "youtube":
      return <FaYoutube />;
    default:
      return null;
  }
}
import lebraLogo from "@/public/images/operators/logo-lebara.jpeg";
import postMobileLogo from "@/public/images/operators/logo-postmobil.png";
import saltLogo from "@/public/images/operators/logo-salt.jpeg";
import sunriseLogo from "@/public/images/operators/logo-sunrise.png";
import swisscomLogo from "@/public/images/operators/logo-swisscom.png";
import swisscomSvgLogo from "@/public/images/operators/logo-swisscom.svg";
import talktalkLogo from "@/public/images/operators/logo-talktalk.png";
import teleboyLogo from "@/public/images/operators/logo-teleboy.png";
import wingoLogo from "@/public/images/operators/logo-wingo.png";
import yalloLogo from "@/public/images/operators/logo-yallo.png";
import otherLogo from "@/public/images/operators/other.jpg";


// Define the type for the operator item
export interface Operator {
  id: string;
  name: string;
  image: string;
}

export const operatorsList: Operator[] = [
  { id: "swisscom", name: "Swisscom", image: swisscomLogo.src },
  { id: "yallo", name: "Yallo", image: yalloLogo.src },
  { id: "sunrise", name: "Sunrise", image: sunriseLogo.src },
  { id: "salt", name: "Salt", image: saltLogo.src },
  { id: "talktalk", name: "Talktalk", image: talktalkLogo.src },
  { id: "teleboy", name: "Teleboy", image: teleboyLogo.src },
  { id: "postmobile", name: "Post Mobile", image: postMobileLogo.src },
  { id: "wingo", name: "Wingo", image: wingoLogo.src },
  { id: "lebara", name: "Lebara", image: lebraLogo.src },
  { id: "autre", name: "Autre", image: otherLogo.src },
];

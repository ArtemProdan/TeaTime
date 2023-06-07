import { useMedia } from "react-media-match";


 export const Groups = ({ shortName, name }) => {
    const title = useMedia({
      mobile: shortName,
      tablet: name,
    });
  
    return <span>Hello {title}</span>;
  };


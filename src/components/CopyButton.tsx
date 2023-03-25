import { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";

interface Props {
  text: string;
}

async function copyTextToClipboard(text: string) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    // legecy browsers
    return Promise.resolve(document.execCommand("copy", true, text));
  }
}

export function CopyButton({ text }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    await copyTextToClipboard(text);
    setIsCopied(true);
  };

  useEffect(() => {
    setIsCopied(false);
  }, [text]);

  return (
    <Button
      style={{ textTransform: "none" }}
      variant="contained"
      startIcon={isCopied ? <CheckCircleIcon /> : <ContentCopyIcon />}
      onClick={handleCopyClick}
    >
      {text}
    </Button>
  );
}

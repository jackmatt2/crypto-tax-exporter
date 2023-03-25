import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import QRCode from "react-qr-code";
import { Asset, Provider } from "../assets/types";
import { Stack } from "@mui/system";
import { CopyButton } from "./CopyButton";

interface Props {
  provider: Provider;
  asset: Asset;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DonateDialog({
  asset,
  provider,
  open,
  setOpen,
}: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Has this CSV saved you stress and precious time completing your TAX
          obligations?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>
              The community gives their time maintaining these CSV providers
              free of charge.
            </p>
            <p>
              Help ensure the <b>{provider.displayName}</b> provider is still
              around next year by sending a tip to{" "}
              <a
                target="_blank"
                href={`https://github.com/${provider.maintainer.githubUsername}`}
              >
                {provider.maintainer.githubUsername}
              </a>
              {"'s "} personal {asset.symbol} wallet.
            </p>
            <Stack alignItems="center">
              <div style={{ background: "white", padding: "16px" }}>
                <QRCode value={provider.maintainer.personalWallet} />
              </div>
              <CopyButton text={provider.maintainer.personalWallet} />
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import { useState } from "react";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Container, Stack } from "@mui/system";
import {
  Alert,
  createTheme,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import assets from "./assets";
import { Asset, Provider } from "./assets/types";
import { Serializer } from "./serializer/types";
import exporters from "./serializer";
import CloudDownloadRoundedIcon from "@mui/icons-material/CloudDownloadRounded";
import LogoIcon from "@mui/icons-material/Hub";
import { GitHub } from "@mui/icons-material";
import { downloadCSV } from "./utils/download";
import DonateDialog from "./components/DonateDialog";

const theme = createTheme();

function App() {
  const [donateOpen, setDonateOpen] = useState(false);
  const [asset, setAsset] = useState<Asset>();
  const [provider, setProvider] = useState<Provider>();
  const [exporter, setExporter] = useState<Serializer>();
  const [walletAddress, setWalletAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleAssetChanged = (ev: SelectChangeEvent) => {
    const asset = assets.find((it) => it.id === ev.target.value);
    setAsset(asset);
    setProvider(undefined);
    setWalletAddress("");
  };

  const handleProviderChanged = (ev: SelectChangeEvent) => {
    const provider = asset?.providers.find((it) => it.id === ev.target.value);
    setProvider(provider);
  };

  const handleExporterChanged = (ev: SelectChangeEvent) => {
    const exporter = exporters.find((it) => it.id === ev.target.value);
    setExporter(exporter);
  };

  const handleSubmit = async () => {
    try {
      setErrorMessage("");
      if (!provider || !exporter || !asset) {
        throw new Error(
          "Application is in an invalid state: no provider or exporter defined - this should never happen"
        );
      }

      // Eventualy the user will be able to configure these settings
      const hints = {
        proxy: (url: string) => `https://corsproxy.io/?${url}`,
        rollup: true,
      };

      const transactions = await provider.getTransactions(walletAddress, hints);
      const csv = exporter.serialize(transactions);
      downloadCSV(`${exporter.id}-${asset.symbol}-${walletAddress}`, csv);
      setDonateOpen(true);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(`${err.name}: ${err.message}`);
      } else {
        throw err;
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography variant="h4">
            <LogoIcon
              color="secondary"
              fontSize="large"
              sx={{
                animation: "tick 8s infinite linear",
                "@keyframes tick": {
                  "0%": {
                    transform: "rotate(360deg)",
                    scale: "1",
                  },
                  "50%": {
                    transform: "rotate(180deg)",
                    scale: "1.2",
                  },
                  "100%": {
                    transform: "rotate(0deg)",
                    scale: "1",
                  },
                },
              }}
            />{" "}
            Crypto TAX Exporter
          </Typography>
          <Tooltip title="Source code on Github">
            <a
              target="_blank"
              href="https://github.com/jackmatt2/crypto-tax-exporter"
            >
              <GitHub />
            </a>
          </Tooltip>
        </Stack>
        <Stack spacing={3}>
          <br />
          <Typography variant="body2" fontFamily={"cursive"}>
            The only things certain in life are death and taxes!
          </Typography>

          <Alert severity="info">
            Use this tool to export crypto transactions to a CSV file from your
            "self custody" wallets. Then import them into your favourite TAX
            reporting reporting tool.
          </Alert>

          {errorMessage && (
            <Alert severity="error">
              <div>{errorMessage}</div>
              <div>
                {provider ? (
                  <>
                    If you beleive this error needs attention, create an issue
                    on the{" "}
                    <a
                      target="_blank"
                      href={`https://github.com/jackmatt2/crypto-tax-exporter/issues/new?assignees=&labels=bug&template=bug_report.md&title=BUG: ${provider?.displayName} maintained by @${provider.maintainer.githubUsername}`}
                    >
                      Github repository
                    </a>{" "}
                    tagging @{provider.maintainer.githubUsername} (the
                    maintainer of {provider?.displayName})
                  </>
                ) : (
                  <>
                    If you beleive this error needs attention, create an issue
                    on the{" "}
                    <a
                      target="_blank"
                      href="https://github.com/jackmatt2/crypto-tax-exporter/issues"
                    >
                      Github repository
                    </a>{" "}
                  </>
                )}
              </div>
            </Alert>
          )}

          <FormControl variant="outlined">
            <InputLabel id="export-label">Export Format</InputLabel>
            <Select
              required
              labelId="export-label"
              value={exporter?.id ?? ""}
              onChange={handleExporterChanged}
              label="Export Format"
            >
              <MenuItem value="">
                <em>Please Select</em>
              </MenuItem>
              {exporters?.map((e) => (
                <MenuItem key={e.id} value={e.id}>
                  {e.displayName}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              Export format not available? Consider{" "}
              <a
                target="_blank"
                href="https://github.com/jackmatt2/crypto-tax-exporter/blob/main/CONTRIBUTING.md"
              >
                contributing
              </a>
            </FormHelperText>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel id="asset-label">Asset</InputLabel>
            <Select
              required
              labelId="asset-label"
              value={asset?.id ?? ""}
              onChange={handleAssetChanged}
              label="Asset"
            >
              <MenuItem value="">
                <em>Please Select</em>
              </MenuItem>
              {assets.map((a) => (
                <MenuItem key={a.id} value={a.id}>
                  <img width={32} height={32} src={a.icon} alt="" />
                  &nbsp;&nbsp;{a.displayName}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              Asset not found? Consider{" "}
              <a
                target="_blank"
                href="https://github.com/jackmatt2/crypto-tax-exporter/blob/main/CONTRIBUTING.md"
              >
                contributing
              </a>{" "}
              - you can get rewarded!
            </FormHelperText>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel id="provider-label">Provider</InputLabel>
            <Select
              required
              labelId="provider-label"
              value={provider?.id ?? ""}
              onChange={handleProviderChanged}
              label="Provider"
              disabled={!asset}
            >
              <MenuItem value="">
                <em>Please Select</em>
              </MenuItem>
              {asset?.providers.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.displayName}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              Provider not working? Consider{" "}
              <a
                target="_blank"
                href="https://github.com/jackmatt2/crypto-tax-exporter/blob/main/CONTRIBUTING.md"
              >
                contributing
              </a>{" "}
              - you can get rewarded!
            </FormHelperText>
          </FormControl>

          <TextField
            required
            label="Wallet Address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          ></TextField>

          <Button
            startIcon={<CloudDownloadRoundedIcon />}
            variant="contained"
            onClick={handleSubmit}
            disabled={!(walletAddress && exporter && provider)}
            size="large"
          >
            Download
          </Button>
        </Stack>
        {asset && provider && (
          <DonateDialog
            asset={asset}
            provider={provider}
            open={donateOpen}
            setOpen={setDonateOpen}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;

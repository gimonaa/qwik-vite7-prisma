import { component$ } from "@qwik.dev/core";
import { QRCode } from "@kunai-consulting/qwik";
import Logo from "~/media/arpa-logo.svg";

export interface QrCodeProps {
  url: string;
  size?: number;
  ref?: SVGSVGElement | undefined;
}

export const QrCode = component$<QrCodeProps>((props) => {
  console.debug("QrCode props:", props);

  const size = props.size || 200;

  return (
    <div class="m-2 mt-6 p-7">
      {props.url !== "" && (
        <QRCode.Root value={props.url} level="H">
          <QRCode.Frame class="qr-code-frame">
            <QRCode.PatternSvg width={size} height={size}>
              <QRCode.PatternPath fill="#005da4" />
            </QRCode.PatternSvg>
          </QRCode.Frame>
          <QRCode.Overlay class="bg-white p-1.5">
            <img
              src={Logo}
              alt="Qwik Logo"
              height={size * 0.3}
              width={size * 0.3}
            />
          </QRCode.Overlay>
        </QRCode.Root>
      )}
      <div class="mt-5">{props.url}</div>
    </div>
  );
});

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Column,
  Section,
  Text,
} from "@react-email/components";

type Props = {
  firstName: string;
  businessEmail: string;
  phone: string;
  businessAndSize: string;
  optionalMessage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
  landingUrl?: string;
  submittedAt: string;
};

const GOLD = "#b8874a";
const INK = "#14110c";

export default function LeadEmail({
  firstName,
  businessEmail,
  phone,
  businessAndSize,
  optionalMessage,
  utmSource,
  utmMedium,
  utmCampaign,
  utmContent,
  gclid,
  fbclid,
  landingUrl,
  submittedAt,
}: Props) {
  const source = gclid ? "Google Ads" : fbclid ? "Meta Ads" : utmSource || "Direct / unknown";

  return (
    <Html>
      <Head />
      <Preview>{`New Managed IT lead from ${firstName} — ${businessAndSize}`}</Preview>
      <Body style={{ backgroundColor: "#f7f6f3", fontFamily: "Arial, Helvetica, sans-serif", margin: 0, padding: "24px 0" }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "12px", overflow: "hidden", border: "1px solid #e6e5e0" }}>
          <Section style={{ backgroundColor: INK, padding: "24px 28px" }}>
            <Text style={{ color: "#ffffff", fontSize: "18px", fontWeight: 700, margin: 0 }}>
              True<span style={{ color: "#e4cf9f" }}>Tel</span>
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", margin: "4px 0 0" }}>
              New Managed IT lead · {source}
            </Text>
          </Section>

          <Section style={{ padding: "28px" }}>
            <Heading as="h1" style={{ fontSize: "20px", color: INK, margin: "0 0 4px" }}>
              {firstName} wants a free IT assessment
            </Heading>
            <Text style={{ fontSize: "13px", color: "#6b6f76", margin: "0 0 20px" }}>
              Submitted {submittedAt} (AEST/AEDT) · call within 4 business hours.
            </Text>

            <Hr style={{ borderColor: "#e6e5e0", margin: "0 0 16px" }} />

            <LeadRow label="Name" value={firstName} />
            <LeadRow label="Business email" value={businessEmail} />
            <LeadRow label="Phone" value={phone} />
            <LeadRow label="Business & size" value={businessAndSize} />

            {optionalMessage ? (
              <>
                <Hr style={{ borderColor: "#e6e5e0", margin: "16px 0" }} />
                <Text style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "#6b6f76", margin: "0 0 6px" }}>
                  What they want to solve
                </Text>
                <Text style={{ fontSize: "14px", color: INK, lineHeight: "22px", margin: 0 }}>
                  {optionalMessage}
                </Text>
              </>
            ) : null}

            <Hr style={{ borderColor: "#e6e5e0", margin: "16px 0" }} />

            <Text style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "#6b6f76", margin: "0 0 6px" }}>
              Ad attribution
            </Text>
            <LeadRow label="Source / Medium" value={[utmSource, utmMedium].filter(Boolean).join(" / ") || "—"} />
            <LeadRow label="Campaign" value={utmCampaign || "—"} />
            <LeadRow label="Content" value={utmContent || "—"} />
            {gclid ? <LeadRow label="Google Click ID" value={gclid} /> : null}
            {fbclid ? <LeadRow label="Meta Click ID" value={fbclid} /> : null}
            {landingUrl ? <LeadRow label="Landed on" value={landingUrl} /> : null}

            <Hr style={{ borderColor: "#e6e5e0", margin: "20px 0 16px" }} />

            <Section style={{ backgroundColor: "rgba(184,135,74,0.08)", borderRadius: "8px", padding: "14px 16px" }}>
              <Text style={{ fontSize: "13px", color: GOLD, fontWeight: 700, margin: "0 0 4px" }}>
                Suggested reply
              </Text>
              <Text style={{ fontSize: "13px", color: "#3a3f46", lineHeight: "20px", margin: 0 }}>
                {`Hi ${firstName}, thanks for booking a free IT assessment with TrueTel. I'd love to learn about ${businessAndSize}. When's a good 30 minutes this week for a quick call?`}
              </Text>
            </Section>

            <Text style={{ fontSize: "11px", color: "#9a9ea4", margin: "20px 0 0" }}>
              Reply directly to this email to respond to {firstName}. Source: Managed IT ad-campaign landing page.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function LeadRow({ label, value }: { label: string; value: string }) {
  return (
    <Row style={{ marginBottom: "10px" }}>
      <Column style={{ width: "140px", verticalAlign: "top" }}>
        <Text style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "#6b6f76", margin: 0 }}>
          {label}
        </Text>
      </Column>
      <Column>
        <Text style={{ fontSize: "14px", color: "#14110c", fontWeight: 600, margin: 0, wordBreak: "break-word" }}>{value}</Text>
      </Column>
    </Row>
  );
}

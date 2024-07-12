import { Box, Card, Text } from '@shopify/polaris';

interface CardWithTitleProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const CardWithTitle = ({ title, subtitle, children }: CardWithTitleProps) => {
  return (
    <Card>
      <Box paddingBlockEnd={'300'}>
        <Text as="p" variant="headingSm">
          {title}
        </Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          {subtitle}
        </Text>
      </Box>
      {children}
    </Card>
  );
};

export default CardWithTitle;

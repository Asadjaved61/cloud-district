export interface CloudProvider {
  displayName: string;
  description: string;
  isActive: boolean;
}

const cloudProviders: CloudProvider[] = [
  {
    displayName: "AWS",
    description: "Amazon Web Services",
    isActive: false,
  },
  {
    displayName: "Azure",
    description: "Microsoft Azure",
    isActive: false,
  },
  {
    displayName: "GCP",
    description: "Google Cloud Platform",
    isActive: false,
  },
  {
    displayName: "DigitalOcean",
    description: "DigitalOcean",
    isActive: false,
  },
  {
    displayName: "UpCloud",
    description: "UpCloud",
    isActive: false,
  },
];

export default cloudProviders;

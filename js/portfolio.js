export const blogs = [
  {
    slug: "aws-cloud-practitioner-study-plan",
    image: "images/blog/learn.jpeg",
    date: "15 Mar 2024",
    title: "AWS Cloud Practitioner: My Study Plan and Key Takeaways",
    description:
      "Passed the AWS Certified Cloud Practitioner exam in January 2024. In this post I share the exact study plan I followed — from core services (EC2, S3, RDS, Lambda, IAM) to the exam strategies that helped me pass on the first attempt. Includes free and paid resources.",
    tags: ["AWS", "Cloud", "Certification"],
  },
  {
    slug: "laravel-microservices-government-system",
    image: "images/blog/framework.webp",
    date: "28 Oct 2024",
    title: "Building a Multi-District Government System with Laravel Microservices",
    description:
      "How our team built and deployed the RDCD Beneficiary Training Management System — a microservice-based platform serving 50,000+ beneficiaries across multiple districts under the Ministry of Local Government. Covers architecture decisions, CI/CD pipeline setup with GitHub Actions, and lessons learned.",
    tags: ["Laravel", "Microservices", "Backend"],
  },
  {
    slug: "cut-deployment-time-github-actions-docker",
    image: "images/blog/income.webp",
    date: "4 Jan 2025",
    title: "How I Cut API Deployment Time by 60% Using GitHub Actions & Docker",
    description:
      "A step-by-step breakdown of the CI/CD pipeline I implemented at Orange Business Development that reduced deployment time from 25 minutes to under 10 minutes with zero-downtime releases. Covers Docker containerisation, self-hosted runners, environment secrets management, and rollback strategies.",
    tags: ["CI/CD", "Docker", "DevOps"],
  },
  {
    slug: "choosing-aws-compute-ec2-ecs-lambda",
    image: "images/blog/aws-compute.jpg",
    date: "18 Feb 2025",
    title: "EC2 vs ECS vs Lambda: Choosing the Right Compute on AWS",
    description:
      "Every AWS project starts with the same question: where should this code actually run? A practical decision framework for picking between EC2, ECS, and Lambda based on workload shape, traffic patterns, cost, and operational overhead — with real examples from production systems I've run on all three.",
    tags: ["AWS", "Cloud", "Architecture"],
  },
  {
    slug: "aws-vpc-networking-fundamentals",
    image: "images/blog/vpc-networking.jpg",
    date: "22 Apr 2025",
    title: "AWS VPC Networking Explained: Subnets, Route Tables, and NAT",
    description:
      "VPC networking is where most cloud engineers' mental models break down. This post builds one from scratch: public vs private subnets, route tables, internet and NAT gateways, and security groups vs NACLs — ending with the three-tier network layout I use as a default for production workloads.",
    tags: ["AWS", "Cloud", "Networking"],
  },
  {
    slug: "docker-multi-stage-builds-smaller-images",
    image: "images/blog/docker-builds.jpg",
    date: "10 Jun 2025",
    title: "Docker Multi-Stage Builds: From 1.2GB Images to 90MB",
    description:
      "Our PHP and Node images were over a gigabyte, and every deploy paid for it in pull time and registry storage. Multi-stage builds cut them by more than 90%. A walkthrough of the technique, the layer-caching rules that make builds fast, and the base-image choices that actually matter.",
    tags: ["Docker", "DevOps", "CI/CD"],
  },
  {
    slug: "monitoring-prometheus-grafana-microservices",
    image: "images/blog/monitoring.jpg",
    date: "5 Sep 2025",
    title: "Monitoring Microservices with Prometheus and Grafana",
    description:
      "You can't fix what you can't see. How I set up Prometheus and Grafana to monitor a multi-service Laravel platform — the four golden signals, exporters worth installing, alert rules that page for symptoms instead of causes, and the dashboard layout my team actually uses during incidents.",
    tags: ["DevOps", "Monitoring", "Microservices"],
  },
  {
    slug: "designing-rate-limiter-system-design",
    image: "images/blog/rate-limiter.jpg",
    date: "12 Dec 2025",
    title: "Designing a Rate Limiter: A Practical System Design Walkthrough",
    description:
      "The rate limiter is a system design classic because it packs real distributed-systems tradeoffs into a small problem. Token bucket vs sliding window, where the limiter lives in your architecture, keeping counters in Redis, and what changes when you go from one server to twenty.",
    tags: ["System Design", "Backend", "Scalability"],
  },
  {
    slug: "scaling-databases-replication-sharding-caching",
    image: "images/blog/database-scaling.jpg",
    date: "20 Mar 2026",
    title: "Scaling Databases: Replication, Sharding, and Caching in Practice",
    description:
      "Most systems don't die from too much code — they die from one overloaded database. The scaling ladder I follow in practice: indexing and query fixes first, then read replicas, then caching with Redis, and only then sharding — with the failure modes each step introduces along the way.",
    tags: ["System Design", "Database", "Scalability"],
  },
];

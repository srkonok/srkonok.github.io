export const blogs = [
  {
    slug: "aws-cloud-practitioner-study-plan",
    image: "images/blog/learn.webp",
    date: "15 Mar 2024",
    title: "AWS Cloud Practitioner: My Study Plan and Key Takeaways",
    description:
      "Passed the AWS Certified Cloud Practitioner exam in January 2024. In this post I share the exact study plan I followed, from core services (EC2, S3, RDS, Lambda, IAM) to the exam strategies that helped me pass on the first attempt. Includes free and paid resources.",
    tags: ["AWS", "Cloud", "Certification"],
    faqs: [
      {
        q: "How long does it take to prepare for the AWS Cloud Practitioner exam?",
        a: "About four weeks alongside a full-time job: week one for core services (EC2, S3, RDS, Lambda, IAM), week two for security and the shared responsibility model, week three for billing, pricing, and support plans, and week four for timed practice exams. Book the real exam once you consistently score above 85% on practice tests.",
      },
      {
        q: "What domains does the AWS Cloud Practitioner (CLF-C02) exam cover?",
        a: "Four domains: Cloud Concepts (24%), Security and Compliance (30%), Cloud Technology and Services (34%), and Billing, Pricing and Support (12%). Working engineers most often lose marks on billing and support topics.",
      },
      {
        q: "Is the AWS Cloud Practitioner certification worth it for experienced engineers?",
        a: "Yes, with the right expectations. It won't prove deep technical skill, but it fills the gaps production experience rarely covers (billing, support plans, compliance programs) and gives you a verified credential for the cloud part of your profile.",
      },
    ],
  },
  {
    slug: "laravel-microservices-government-system",
    image: "images/blog/laravel-microservices.webp",
    date: "28 Oct 2024",
    title: "Building a Multi-District Government System with Laravel Microservices",
    description:
      "How our team built and deployed the RDCD Beneficiary Training Management System, a microservice-based platform serving 50,000+ beneficiaries across multiple districts under the Ministry of Local Government. Covers architecture decisions, CI/CD pipeline setup with GitHub Actions, and lessons learned.",
    tags: ["Laravel", "Microservices", "Backend"],
    faqs: [
      {
        q: "What is the RDCD Beneficiary Training Management System?",
        a: "A microservice-based platform built with Laravel that manages training for 50,000+ beneficiaries across multiple districts in Bangladesh, operated under the Ministry of Local Government's Rural Development and Co-operatives Division.",
      },
      {
        q: "Why use microservices for a multi-district government system?",
        a: "Services can be deployed and scaled independently per district, a failure in one service stays isolated instead of taking down the whole platform, and each service gets its own CI/CD pipeline with GitHub Actions for safer, more frequent releases.",
      },
    ],
  },
  {
    slug: "cut-deployment-time-github-actions-docker",
    image: "images/blog/cicd-docker.webp",
    date: "4 Jan 2025",
    title: "How I Cut API Deployment Time by 60% Using GitHub Actions & Docker",
    description:
      "A step-by-step breakdown of the CI/CD pipeline I implemented at Orange Business Development that reduced deployment time from 25 minutes to under 10 minutes with zero-downtime releases. Covers Docker containerisation, self-hosted runners, environment secrets management, and rollback strategies.",
    tags: ["CI/CD", "Docker", "DevOps"],
    faqs: [
      {
        q: "How do you cut deployment time with GitHub Actions and Docker?",
        a: "Containerise the application so builds are reproducible, use Docker layer caching so unchanged dependencies are not rebuilt, run pipelines on self-hosted runners close to the deployment target, and roll out with zero-downtime releases. This took our API deployments from 25 minutes to under 10.",
      },
      {
        q: "How do you achieve zero-downtime deployments with Docker?",
        a: "Build and health-check the new container before switching traffic to it, then keep the previous image available so a rollback is just re-pointing traffic, not rebuilding.",
      },
    ],
  },
  {
    slug: "choosing-aws-compute-ec2-ecs-lambda",
    image: "images/blog/aws-compute.webp",
    date: "18 Feb 2025",
    title: "EC2 vs ECS vs Lambda: Choosing the Right Compute on AWS",
    description:
      "Every AWS project starts with the same question: where should this code actually run? A practical decision framework for picking between EC2, ECS, and Lambda based on workload shape, traffic patterns, cost, and operational overhead, with real examples from production systems I've run on all three.",
    tags: ["AWS", "Cloud", "Architecture"],
    faqs: [
      {
        q: "When should I use EC2 instead of Lambda or ECS?",
        a: "Use EC2 when you need full control of the operating system, when software was not built for containers, or when the workload runs hot 24/7. A steady high-utilisation service on reserved instances is often the cheapest of the three options, at the cost of managing patching, AMIs, and autoscaling yourself.",
      },
      {
        q: "When is AWS Lambda the right choice?",
        a: "For event-driven and bursty work: processing S3 uploads, reacting to queues, scheduled jobs, webhooks, and low-traffic APIs. Scale-to-zero makes idle endpoints nearly free. The trade-offs are cold starts, a 15-minute execution limit, and poor fit for persistent database connections.",
      },
      {
        q: "What should I pick if I'm not sure between EC2, ECS, and Lambda?",
        a: "Start with Lambda or ECS on Fargate. It is far easier to move from serverless to servers when traffic justifies it than to recover the operations time spent managing instances you didn't need.",
      },
    ],
  },
  {
    slug: "aws-vpc-networking-fundamentals",
    image: "images/blog/vpc-networking.webp",
    date: "22 Apr 2025",
    title: "AWS VPC Networking Explained: Subnets, Route Tables, and NAT",
    description:
      "VPC networking is where most cloud engineers' mental models break down. This post builds one from scratch: public vs private subnets, route tables, internet and NAT gateways, and security groups vs NACLs, ending with the three-tier network layout I use as a default for production workloads.",
    tags: ["AWS", "Cloud", "Networking"],
    faqs: [
      {
        q: "What makes a subnet public in AWS?",
        a: "Only its route table. A subnet is public when its route table sends 0.0.0.0/0 to an Internet Gateway; a private subnet is one whose route table doesn't. There is no 'public subnet' setting on the subnet itself.",
      },
      {
        q: "What is the difference between an Internet Gateway and a NAT Gateway?",
        a: "An Internet Gateway is a two-way door: traffic in and out for resources with public IPs. A NAT Gateway is one-way: instances in private subnets can initiate outbound connections, but nothing can connect in. A NAT Gateway must live in a public subnet and is billed per hour and per gigabyte.",
      },
      {
        q: "Security groups vs NACLs: which should I use?",
        a: "Security groups for almost everything. They are stateful, instance-level, allow-only firewalls and should carry about 95% of your access control. NACLs are stateless subnet-boundary filters that support deny rules; leave them at defaults unless you need a hard subnet-level block.",
      },
    ],
  },
  {
    slug: "docker-multi-stage-builds-smaller-images",
    image: "images/blog/docker-builds.webp",
    date: "10 Jun 2025",
    title: "Docker Multi-Stage Builds: From 1.2GB Images to 90MB",
    description:
      "Our PHP and Node images were over a gigabyte, and every deploy paid for it in pull time and registry storage. Multi-stage builds cut them by more than 90%. A walkthrough of the technique, the layer-caching rules that make builds fast, and the base-image choices that actually matter.",
    tags: ["Docker", "DevOps", "CI/CD"],
    faqs: [
      {
        q: "How do Docker multi-stage builds reduce image size?",
        a: "You build in one stage with all compilers and dev dependencies, then a second FROM starts a clean stage that copies in only the runtime artifacts. Only the final stage ships, so build tooling never reaches production. Our Node API went from 1.2GB to 140MB and a Go service from 850MB to 18MB.",
      },
      {
        q: "Why doesn't deleting files in a Dockerfile make the image smaller?",
        a: "Each Dockerfile instruction creates an immutable layer. A 'RUN rm -rf' in a later instruction hides the files but they still exist in the earlier layer, so the image stays the same size. The only fix is to never ship those layers, which is what multi-stage builds do.",
      },
      {
        q: "Should I use Alpine, slim, or distroless base images?",
        a: "Alpine is smallest (~8MB) but its musl libc can break native dependencies; slim Debian-based variants are slightly larger but glibc-compatible and a safe default; distroless has the smallest attack surface (no shell or package manager) but is harder to debug, so it suits mature services.",
      },
    ],
  },
  {
    slug: "monitoring-prometheus-grafana-microservices",
    image: "images/blog/monitoring.webp",
    date: "5 Sep 2025",
    title: "Monitoring Microservices with Prometheus and Grafana",
    description:
      "You can't fix what you can't see. How I set up Prometheus and Grafana to monitor a multi-service Laravel platform: the four golden signals, exporters worth installing, alert rules that page for symptoms instead of causes, and the dashboard layout my team actually uses during incidents.",
    tags: ["DevOps", "Monitoring", "Microservices"],
    faqs: [
      {
        q: "What are the four golden signals of monitoring?",
        a: "Latency (request duration, read as p50/p95/p99 percentiles), traffic (requests per second), errors (rate of 5xx responses and exceptions), and saturation (how full things are: queue depth, connection pools, memory pressure). Instrument these four per service before exporting anything else.",
      },
      {
        q: "Should alerts page on symptoms or causes?",
        a: "Page on symptoms users feel: error rate above threshold, p95 latency too high, queues growing without draining, endpoints failing external probes. Keep cause-level metrics like CPU and disk on dashboards for diagnosis. Switching to symptom-based paging cut our pages by roughly 80% and made the remaining ones real.",
      },
      {
        q: "What is a minimal Prometheus and Grafana setup to start with?",
        a: "Run Prometheus, node_exporter, and Grafana with docker-compose, add blackbox_exporter probes for your public endpoints, instrument the golden signals in your main service, and write three symptom-based alert rules. That is roughly an afternoon of work.",
      },
    ],
  },
  {
    slug: "designing-rate-limiter-system-design",
    image: "images/blog/rate-limiter.webp",
    date: "12 Dec 2025",
    title: "Designing a Rate Limiter: A Practical System Design Walkthrough",
    description:
      "The rate limiter is a system design classic because it packs real distributed-systems tradeoffs into a small problem. Token bucket vs sliding window, where the limiter lives in your architecture, keeping counters in Redis, and what changes when you go from one server to twenty.",
    tags: ["System Design", "Backend", "Scalability"],
    faqs: [
      {
        q: "Which algorithm should I use for a rate limiter?",
        a: "Token bucket is the best default: a bucket of N tokens refills at a steady rate and each request spends one. It allows short bursts while enforcing the average rate, and per-client state is just two numbers (token count and last-refill timestamp). Sliding window counter is a solid alternative.",
      },
      {
        q: "How do you rate limit across multiple servers?",
        a: "Move the counters to a shared store, usually Redis, and make the check-and-decrement atomic with a small Lua script. Per-server in-memory counters silently multiply a client's effective limit by the number of servers.",
      },
      {
        q: "Should a rate limiter fail open or fail closed when Redis is down?",
        a: "Decide explicitly. For most public APIs, fail open (allow traffic, alert loudly) because rate limiting is protection rather than a security boundary; fail closed only when the backend must be protected at the cost of rejecting users.",
      },
    ],
  },
  {
    slug: "scaling-databases-replication-sharding-caching",
    image: "images/blog/database-scaling.webp",
    date: "20 Mar 2026",
    title: "Scaling Databases: Replication, Sharding, and Caching in Practice",
    description:
      "Most systems don't die from too much code. They die from one overloaded database. The scaling ladder I follow in practice: indexing and query fixes first, then read replicas, then caching with Redis, and only then sharding, with the failure modes each step introduces along the way.",
    tags: ["System Design", "Database", "Scalability"],
    faqs: [
      {
        q: "In what order should you scale a database?",
        a: "Indexes and query fixes first, then read replicas, then caching with Redis, and sharding only as a last resort. Each step adds permanent complexity, so climb only as high as your traffic forces you to.",
      },
      {
        q: "What is replication lag and what bug does it cause?",
        a: "A read replica is always slightly behind the primary. The classic bug: a user saves a form, the next page reads from a replica, and their change appears lost. Fix it with read-your-own-writes routing: pin a user's reads to the primary for a few seconds after they write.",
      },
      {
        q: "When should you shard a database?",
        a: "Only when a single primary can no longer handle the write volume, since replicas and caching solve read scale. Sharding permanently costs you cross-shard joins and transactions, so consider managed alternatives like Aurora or DynamoDB before splitting the data yourself.",
      },
    ],
  },
  {
    slug: "honeybee-erp-modular-architecture-case-study",
    image: "images/portfolio/honeybeeERP.webp",
    date: "18 Apr 2026",
    title: "Case Study: The Architecture Behind HoneyBee ERP",
    description:
      "A deep dive into the modular ERP platform I build at HoneyBee IoT: why a modular monolith beats microservices for ERP, module boundaries with a shared kernel, scope-aware RBAC, real-time updates over WebSockets with Redis pub/sub, and the caching layers that keep reports fast.",
    tags: ["ERP", "NestJS", "Architecture"],
    faqs: [
      {
        q: "Should an ERP system use microservices?",
        a: "Usually not. ERP modules are deeply relational (payroll reads attendance, inventory posts to accounting), so splitting them into services turns every business transaction into a distributed transaction. A modular monolith with hard internal boundaries gives the maintainability benefits without the distributed-systems tax, and leaves extraction open for later.",
      },
      {
        q: "How do you design RBAC for an ERP?",
        a: "Three layers: atomic per-module permissions (like payroll.run.execute), roles as configurable bundles of permissions, and scopes that bind a role to an organisational slice such as a branch or department. Every API route declares its required permission and a guard checks the user's effective permissions from a Redis cache.",
      },
      {
        q: "How does HoneyBee ERP deliver real-time updates?",
        a: "Modules emit domain events to Redis pub/sub, and a stateless WebSocket gateway fans them out to subscribed clients, filtered by the same RBAC rules. Using Redis pub/sub instead of direct emits means any gateway instance can serve any client, keeping scaling and zero-downtime deploys simple.",
      },
    ],
  },
  {
    slug: "mess-monitor-serverless-case-study",
    image: "images/portfolio/messmonitor.webp",
    date: "23 May 2026",
    title: "Case Study: Mess Monitor — Serverless on a Student Budget",
    description:
      "How my expense-splitting app went from a fix for my own student mess to 10K+ downloads and 700+ daily users on a backend that costs almost nothing: Flutter, API Gateway, Lambda, and a single-table DynamoDB design, with the month-end settlement algorithm that ends household arguments.",
    tags: ["Serverless", "AWS", "Mobile"],
    faqs: [
      {
        q: "What architecture does Mess Monitor use?",
        a: "A Flutter app talking to a fully serverless AWS backend: API Gateway in front of Node.js Lambda functions with DynamoDB for storage. Nothing runs when nobody is using it, so cost scales from zero and there is no server to maintain.",
      },
      {
        q: "How is the DynamoDB single-table design structured?",
        a: "One table partitioned by mess (household) ID, with typed sort-key prefixes for members, meals, and expenses (like MEAL#date#member). A month's dashboard is a single partition query with a sort-key range, and running totals are kept with atomic counter updates on write.",
      },
      {
        q: "How much does it cost to run a serverless app with 700+ daily users?",
        a: "Almost nothing for this workload: Lambda invocations and on-demand DynamoDB capacity for meal logging sit largely within the AWS free tier. The smallest always-on server would cost more per month than this backend does per year.",
      },
    ],
  },
];

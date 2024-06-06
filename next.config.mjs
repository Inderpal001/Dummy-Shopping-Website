import path from 'path';

const nextConfig = {
  images: {
    domains: ['fakestoreapi.com'],
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'styles')],
  },
};

export default nextConfig;
# frozen_string_literal: true

# load all the app code into memory before forking new workers
preload_app!

# number of worker processes
processes = Integer(ENV.fetch('PUMA_WORKERS', 1))
workers(processes)

# min & max number of threads per process
min_threads = Integer(ENV.fetch('PUMA_MIN_THREADS', 1))
max_threads = Integer(ENV.fetch('PUMA_MAX_THREADS', 1))
threads(min_threads, max_threads)

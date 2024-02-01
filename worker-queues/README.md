# worker-queues

### When to use 

 - Offloading complicated tasks
 - Handling side effects
 - Working with actions based on various events
 - Delaying jobs, allowing them to fail and retry
 - Too much to handle at the same time.
 - Sending emails (delayed, failures, retires)
 - Generating thumbnails for images, resizing
 - Cleanup of old data, changing state of old database entries, expired things.
 - Generating statistics with heavy queries


### Usage
 - BullMQ: library build on top of redis that helps to manage it efficiently.
### Features:
- LIFO and FIFO jobs
- Priorities
- Deplayed jobs
- Scheduled and repetable jobs according to cron specifications
- Retries of failed jobs
- Automatic recovery from process craches.

- Use `response-time` package to show apis actual processing time in header.


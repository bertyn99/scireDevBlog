export default defineEventHandler(async (event) => {
  const { lessonPath, courseSlug } = await readBody(event)
  const db = hubDb()

  // Upsert lesson progress
  await db.insert(progressSchema.lessonProgress).values({
    userId: 'temp', // TODO: get from session
    lessonPath,
    courseSlug,
    status: 'in_progress',
    startedAt: new Date(),
  }).onConflictDoUpdate({
    target: [progressSchema.lessonProgress.userId, progressSchema.lessonProgress.lessonPath],
    set: { status: 'in_progress' },
  })

  // Also mark course as in_progress
  await db.insert(progressSchema.courseProgress).values({
    userId: 'temp',
    courseSlug,
    status: 'in_progress',
    startedAt: new Date(),
  }).onConflictDoUpdate({
    target: [progressSchema.courseProgress.userId, progressSchema.courseProgress.courseSlug],
    set: { status: 'in_progress' },
  })

  return { success: true }
})

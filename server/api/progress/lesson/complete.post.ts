export default defineEventHandler(async (event) => {
  const { lessonPath } = await readBody(event)
  const db = hubDb()

  await db.update(progressSchema.lessonProgress)
    .set({ status: 'completed', completedAt: new Date() })
    .where(
      and(
        eq(progressSchema.lessonProgress.userId, 'temp'),
        eq(progressSchema.lessonProgress.lessonPath, lessonPath),
      ),
    )

  return { success: true }
})

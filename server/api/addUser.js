import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default defineEventHandler(async (req) => {
  try {
    const commands = await prisma.user.findMany({
      where: {
        super_admin_only: false
      }
    })
    const CommandsList = commands.map(command => {
      return {
        id: command.id,
        name: command.title
      }
    })
    return {
      CommandsList
    }
  } catch (error) {
    console.error(error)
  }
})
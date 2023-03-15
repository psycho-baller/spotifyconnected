import { NextApiHandler } from 'next'
import { getServerSession } from 'next-auth/next'
import { XataClient } from '../../utils/xata'
import { authOptions } from "./auth/[...nextauth]"

const xata = new XataClient()

const handler: NextApiHandler = async (req, res) => {
    // get the data
    const date = new Date()
    const { journalEntry, people, track } = req.body
    // get the user email from next-auth
    const session = await getServerSession(req, res, authOptions)
    // check if the user is logged in
    if (!session) {
        console.log('not logged in');

        res.status(401).end()
        return
    }
    const { email } = session.user
    // get the user id from xata from the email
    const user = await xata.db.users.filter({ email }).getFirst()
    const userId = user?.id
    // generate a unique id for the day
    const id = [userId, date.toISOString().split('T')[0].replaceAll('-', '')].join('-')

    // add song to xata
    const track_id = track.id
    // remove the id from the track
    delete track.id
    await xata.db.songs.createOrUpdate(track_id, { ...track })

    // add the data to xata
    await xata.db.days.createOrUpdate(id, {
        user: userId,
        date,
        log: journalEntry,
        people: people.split(',').map((p: string) => p.trim()),
        song: track_id
    })

    res.end()
}

export default handler
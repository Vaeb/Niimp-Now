import { sendEmbed, matchPosInteger, onError } from '../../util';
import { db, dataMembersAll } from '../../db';
import { userResolvable } from '../../paramTypes';
import { remXp } from '../../expRoles';
import { requiresAdmin, requiresDev, requiresExp } from '../../permissions';

export default {
    cmds: ['remxp', 'removexp', 'takexp', 'delxp'],
    desc: 'Remove xp from a user',
    params: [
        {
            name: 'User',
            desc: 'User to check',
            types: userResolvable.types,
            examples: userResolvable.examples,
            parse: userResolvable.parse,
            parseFail: userResolvable.parseFail,
        },
        {
            name: 'Number',
            desc: 'How much xp to remove',
            types: ['Integer'],
            examples: [['5', '107', '500']],
            parse: ({ str }) => matchPosInteger(str),
            parseFail: ({ str }) => `"${str}" is not a positive integer`,
        },
        {
            name: 'Reason',
            desc: 'Reason for the mute',
            types: ['Text'],
            examples: [['Abusing xp system by sending random messages frequently']],
            optional: true,
            defaultResolve: 'Reason not provided',
        },
    ],

    checkPermissions: [requiresDev, requiresExp],

    func: async ({ channel, args: [member, changeXp, reason] }) => {
        console.log(member, member.id, changeXp, reason);

        const newXp = await remXp(member, changeXp);

        console.log(9999, newXp);

        sendEmbed(channel, {
            title: 'Removed User XP',
            desc: `${member} has lost ${changeXp} xp!`,
            fields: [{ name: 'Reason', value: reason, inline: true }, { name: 'New XP', value: newXp, inline: true }],
        });
    },
};

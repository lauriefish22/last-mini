const { AuthenticationError } = require('apollo-server-express');

const { Tech, Matchup } = require('../models');

const resolvers = {
    Query: {
        technologies: async () => {
            try {
                // Fetch all technologies from the database
                const technologies = await Matchup.distinct('tech1');
                return technologies;
            } catch (error) {
                throw new Error('Failed to fetch technologies');
            }
        },
        matchup: async (_, { id }) => {
            try {
                // Find the matchup by ID
                const matchup = await Matchup.findById(id);
                if (!matchup) {
                    throw new Error('Matchup not found');
                }
                return matchup;
            } catch (error) {
                throw new Error('Failed to fetch matchup');
            }
        },
    },
    Mutation: {
        createMatchup: async (_, { tech1, tech2 }) => {
            try {
                // Create a new matchup with the given tech1 and tech2 values
                const matchup = new Matchup({ tech1, tech2 });
                await matchup.save();
                return matchup;
            } catch (error) {
                throw new Error('Failed to create matchup');
            }
        },
        voteTech: async (_, { matchupId, tech }) => {
            try {
                // Find the matchup by ID
                const matchup = await Matchup.findById(matchupId);
                if (!matchup) {
                    throw new Error('Matchup not found');
                }
                // Increment the vote count for the specified tech
                if (tech === 'tech1') {
                    matchup.tech1_votes += 1;
                } else if (tech === 'tech2') {
                    matchup.tech2_votes += 1;
                }
                // Save the updated matchup
                await matchup.save();
                return matchup;
            } catch (error) {
                throw new Error('Failed to vote for tech');
            }
        },
    },
};


module.exports = resolvers;
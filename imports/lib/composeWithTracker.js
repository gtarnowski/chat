import {Tracker} from 'meteor/tracker';
import {compose} from 'react-komposer';

export function getTrackerLoader (reactiveMapper) {
    return (props, onData, env) => {
        let trackerCleanup = null;
        const handler = Tracker.nonreactive(() => {
            return Tracker.autorun(computation => {
                trackerCleanup = reactiveMapper.call(computation, props, onData, env);
            });
        });

        return () => {
            if (typeof trackerCleanup === 'function') trackerCleanup();
            return handler.stop();
        };
    };
}

// Composer for meteor reactivity
export const composeWithTracker = (mapper, options) => compose(getTrackerLoader(mapper), options);

export default composeWithTracker;
